import rp from 'request-promise';
import Item from './item';
import crud from './../core/crud';
import CategoryAbstract from './../../../core/models/CategoryAbstract';
import helper from './../../../core/helper';
import valuesHelper from '../../../utils/values';


const numberReg = /\d+/g;

class Category extends CategoryAbstract {
	constructor(json) {
		super(json);

		this.pageTitle = '4fresh.ru – интернет-магазин натуральных товаров – Купить живую органическую косметику ручной работы в Москве';
		this.itemsPerPage = 12;
	}

	getPages() {
		return Promise.all([rp(this.uri, 'GET')])
			.then((response) => {
				const paginationString = this.getSelectorAll(response, '.showing')[0].textContent;
				const numbersInPaginationString = paginationString.match(numberReg);
				const [firstItemNumber, secondItemNumber, itemsCount] = numbersInPaginationString;
				this.itemsPerPage = secondItemNumber - firstItemNumber + 1;
				this.pages = Math.ceil(itemsCount / this.itemsPerPage);
				this.error = '';
			})
			.catch((err) => {
				this.pages = 1;
				this.error += err.message;
			});
	}

	getItems(pagen = '1') {
		const settings = crud.get.main.settings();
		const tasks = [];

		const isWithQuery = valuesHelper.getIsUriHasQueryString(this.uri);
		if (isWithQuery) {
			this.uri = this.uri.replace(/PAGEN_\d=\d+/gi, '');
		}

		for (let page = 1; page <= this.pages; page++) {
			const uri = `${this.uri}${isWithQuery ? '&' : '?'}PAGEN_${pagen}=${page}`;

			tasks.push(helper.requestWithTimer(uri, 'GET', null, settings.speed || 1000));
		}
		return Promise.all(tasks)
			.then((pages) => {
				// We check if PAGEN_1 doesn't change page, we change it to PAGEN_2
				if ((pagen !== '2') && (pages.length > 1)) {
					const itemUriOnPageOne = this.getSelector(pages[0], '.ci-list-item__name').getAttribute('href');
					const itemUriOnPageTwo = this.getSelector(pages[1], '.ci-list-item__name').getAttribute('href');

					if (itemUriOnPageOne === itemUriOnPageTwo) {
						return this.getItems('2');
					}
				}

				pages.forEach((page) => {
					const urls = this.getSelectorAll(page, '.ci-list-item__name');
					const items = [];
					urls.forEach((uri) => {
						const item = {
							uri: settings.website + uri.getAttribute('href'),
							appCategory: this.name,
						};
						items.push(new Item(item));
					});
					this.items.push(...items);
				});
				this.error = '';
			})
			.catch((err) => {
				this.error += err.message;
			});
	}
}

export default Category;

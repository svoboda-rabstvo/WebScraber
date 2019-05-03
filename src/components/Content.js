import {Route, Switch} from 'react-router-dom';
import React from 'react';

import Home from './Home';

/* Views */
import ItemsView from './core/views/Items';
import LoginView from './core/views/Login';
import SettingsView from './core/views/Settings';
import CategoriesView from './core/views/Categories';

/* Bel */

import CrudBel from './www/belbohemia/core/crud';
import ItemBel from './www/belbohemia/models/item';
import CookiesBel from './www/belbohemia/core/cookies';
import SettingsBel from './www/belbohemia/models/settings';
import CategoryBel from './www/belbohemia/models/category';

/* Zproduct */
import CrudZproduct from './www/zproduct/core/crud';
import ItemZproduct from './www/zproduct/models/item';
import SettingsZproduct from './www/zproduct/models/settings';
import CategoryZproduct from './www/zproduct/models/category';

/* TianGroup */
import SettingsTian from './www/tian/models/settings';
import CrudTianGroup from './www/tian/core/crud';
import ItemTianGroup from './www/tian/models/item';
import CategoryTiagGroup from './www/tian/models/category';

const Content = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/www/belbohemia/login' render= {
                    () => <LoginView crud={CrudBel} cookies={CookiesBel} key="BL"/>
                }/>
                <Route path='/www/belbohemia/items' render={
                    () => <ItemsView item={ItemBel} crud={CrudBel} settings={SettingsBel.item} key="BI"/>
                }/>
                <Route path='/www/belbohemia/settings' render={
                    () => <SettingsView crud={CrudBel} key="BS"/>
                }/>
                <Route path='/www/belbohemia/categories' render={
                    () => <CategoriesView category={CategoryBel} settings={SettingsBel.category} crud={CrudBel} key="BC"/>
                }/>


                <Route path='/www/zproduct/items' render={
                    () => <ItemsView item={ItemZproduct} crud={CrudZproduct} settings={SettingsZproduct.item} key="ZI"/>
                }/>
                <Route path='/www/zproduct/settings' render={
                    () => <SettingsView crud={CrudZproduct} key="ZS"/>
                }/>
                <Route path='/www/zproduct/categories' render={
                    () => <CategoriesView category={CategoryZproduct} settings={SettingsZproduct.category} crud={CrudZproduct} key="ZC"/>
                }/>

                <Route path='/www/tian/items' render={
                    () => <ItemsView item={ItemTianGroup} crud={CrudTianGroup} settings={SettingsTian.item} key="TI"/>
                }/>
                <Route path='/www/tian/settings' render={
                    () => <SettingsView crud={CrudTianGroup} key="TS"/>
                }/>
                <Route path='/www/tian/categories' render={
                    () => <CategoriesView
                        key="TC"
                        crud={CrudTianGroup}
                        category={CategoryTiagGroup}
                        settings={SettingsTian.category}
                    />
                }/>
            </Switch>
        </main>
    );
};

export default Content;

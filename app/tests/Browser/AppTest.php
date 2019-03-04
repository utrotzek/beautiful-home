<?php
/**
 * Created by PhpStorm.
 * User: uwe
 * Date: 04.03.19
 * Time: 12:53
 */

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\Browser\Components\Navbar;
use Tests\Browser\Components\Sitebar;
use Tests\DuskTestCase;

class AppTest extends DuskTestCase {
    /**
     * Test toggle feature of the sidebar
     *
     * @return void
     */
    public function testSideBarIsToggledByDefault() {
        $this->browse(function (Browser $browser){
            $browser->visit('/');

            $navBar = new Navbar();
            $siteBar = new Sitebar();

            $siteBar->assertToggleState($browser, true);
            $navBar->toggleSidebar($browser);
            $siteBar->assertToggleState($browser, false);
            $siteBar->assertToggleState($browser, true);
            $navBar->toggleSidebar($browser);
        });
    }
}
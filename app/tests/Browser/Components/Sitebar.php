<?php

namespace Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class Sitebar extends BaseComponent
{
    const MODE_FULL = 'full';
    const MODE_SMALL = 'small';

    /**
     * Get the root selector for the component.
     *
     * @return string
     */
    public function selector()
    {
        return '#sidebar';
    }

    /**
     * The vue js component selector
     *
     * @return string
     */
    public function vueComponentSelector()
    {
        return '@sidebar';
    }

    /**
     * Assert that the browser page contains the component.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertVisible($this->selector());
    }

    /**
     * @param Browser $browser
     * @param bool $toggled
     */
    public function assertToggleState(Browser $browser, $toggled = true)
    {
        $browser->assertVue('isToggled', $toggled, $this->vueComponentSelector());
    }

    /**
     * Get the element shortcuts for the component.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@element' => '#selector',
        ];
    }
}

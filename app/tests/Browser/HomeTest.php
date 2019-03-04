<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;

class HomeTest extends DuskTestCase
{
    /**
     * Test the home view
     *
     * @return void
     */
    public function testWelcomePageIsRenderedProperly()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/');
            $motivationTextValue = $browser->vueAttribute('@home-view', 'motivationText');
            $greetingTextValue = $browser->vueAttribute('@home-view', 'greeting');

            $browser->assertSee('Willkommen')
                    ->assertSee($motivationTextValue)
                    ->assertSee(strtoupper($greetingTextValue));
        });
    }
}

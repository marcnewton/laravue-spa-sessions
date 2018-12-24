<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Route;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @return array
     */
    public static final function Routes ()
    {
        $routes = \Illuminate\Support\Facades\Cache::rememberForever('routes.js', function () {

            $routes = [];

            foreach(Route::getRoutes()->getIterator() AS $route)
            {
                if(!array_key_exists('namespace',$route->action))
                    continue;

                if(!is_array($route->action['middleware']))
                    continue;

                if(in_array($route->action['namespace'],['App\Http\Controllers\API'],true))
                    continue;

                $name = $route->getName();

                if(empty($name))
                    continue;

                $routes[$name] = $route->uri;
            };

        	return $routes;

        });

        return $routes;

    }

    public static final function Language()
    {
        $lang = config('app.locale');

        $strings = \Illuminate\Support\Facades\Cache::rememberForever('languages.' . $lang, function () use ($lang) {

            $files = glob(resource_path('lang/' . $lang . '/*.php'));
            $strings = [];

            foreach ($files as $file) {
                $name = basename($file, '.php');
                $strings[$name] = require $file;
            }

            return $strings;

        });

        return $strings;

    }
}

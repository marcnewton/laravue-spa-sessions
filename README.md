> This is a development Sanbox for testing ideas.
> 
> If you are interested in building a Laravel Project with a Single Page Application (SPA) frontend using Vue then head on over to [Lara Cli](https://github.com/laracli)

# Laravel Vue SPA + SDA

Laravel Vue Cookie Session based SPA (Single Page Application) skeleton boilerplate for SDA (Same Domain Application).
Configured to be built using VUE Cli 3.

> This Vue boilerplate must be built using the [VUE Cli](https://cli.vuejs.org/).
> Assumes you are using [Laravel Homestead](https://laravel.com/docs/5.8/homestead) .

## Who is it for
This source code is ideal for simplistic SPA builds with the following features:
 - Out of the box solution utilising standard Laravel sessions.
 - Same domain App.
 - Laravel API kept completely free for separate API development.
 - Uses only the Http controllers for the App delivering JSON.
 - Does **NOT** use Blade views to deliver Vue templates.
 - Uses single file Vue components.
 - Script chunking configured by default.
 - Wants to use [Tailwind CSS](https://tailwindcss.com/) (Default) or [Vuetify](https://vuetifyjs.com).

## Alternatives

~~OAuth API edition (Laravel Passport + CORS) (TODO)~~

## Development Dependencies

Install [Node 10.14+](https://nodejs.org/en/)

Install [Composer](https://getcomposer.org/)

Install [Yarn](https://yarnpkg.com/en/docs/install);

Run `yarn global add @vue/cli` [Installation Guide](https://cli.vuejs.org/guide/installation.html)

## Installation

0) Create Laravel project as per the official installation guide lines: https://laravel.com/docs/5.8/installation

0) Unpack this repositories source over the top of your new Laravel project.

0) Run `yarn install`

0) Run `composer require barryvdh/laravel-cors` - https://github.com/barryvdh/laravel-cors

0) Configure database settings in `.env` file.

0) [Connect Via SSH](https://laravel.com/docs/5.8/homestead#connecting-via-ssh)

0) `cd code`

0) `php artisan migrate`

0) `php artisan db:seed` (Create a default user)

## Development First Time Setup

You must use VUE CLI

0) Run `vue ui`

0) Goto http://localhost:8000/project/select

0) Import the projects root directory.

> Your project root directory is the directory that should contain: /app, /public, /src, /vue.config.js etc.

## Developing & Building

0) `vagrant up`

0) `vue ui`

0) Run serve task from Vue Cli

0) Write code

### Login

> If you ran the database seeder you can use this demo user to login:

`demo@example.dev` `demo1234`

# Production Building

> If you want assets to build into the `public` directory instead of `dist`, use the provided Vue Cli task `build-public`
>
> !!!IMPORTANT NOTICE!!!
>
> When using `build-public` the following folders inside of **/public** are cleared on build: `js`, `css`, `img` and `fonts`.
>
> Place custom content into `/src/assets/`, If you do not want assets to be handled by webpack at all including copy then use `/public/static/`.
>
> See [HTML & Static Assets](https://cli.vuejs.org/guide/html-and-static-assets.html) for more information on how webpack handles assets.


# Check Production Build Locally

If you have used `build-public` you can check the final app package functionality by visiting your VM's ip, assuming your using homestead: http://192.168.10.10.
You will be served the actual production bundle rather than what is served by the serve task.



# Vuetify (TODO)

`yarn remove tailwindcss`

`yarn install stylus-loader stylus @mdi/font --save-dev`

`yarn install vuetify`


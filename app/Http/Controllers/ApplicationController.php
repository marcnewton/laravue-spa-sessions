<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Returns HTML markup on static request else return application configuration JSON payload.
     * Returns application initialization data on app boot.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public final function index(Request $request)
    {
        if($request->ajax())

            return response()->json([
                'routes' => User::Routes(),
                'language' => User::Language(),
            ]);

        return view('layouts.app');
    }

}

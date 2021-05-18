<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UrlController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('cors')->group(function(){
    Route::post('/shorting', [UrlController::class, 'store']);
    Route::post('/code', [UrlController::class, 'code']);
});

Route::get('/{link_short}', [UrlController::class, 'access']);


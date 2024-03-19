<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login_v1', [App\Http\Controllers\AuthController::class, 'login'])->name('login_v1');
Route::get('/auth', [App\Http\Controllers\AuthController::class, 'getAuth'])->name('auth');
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->name('logout');
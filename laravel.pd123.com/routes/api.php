<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
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

// CATEGORY
Route::get("/category", [CategoryController::class, "index"]); // Добавляємо шлях до нашого контролера і його функцій
Route::post('/category', [CategoryController::class, "store"]);
Route::post("/category/edit/{id}", [CategoryController::class, "put"]);
Route::delete("/category/{id}", [CategoryController::class, "delete"]);
Route::get("/category/{id}", [CategoryController::class, "getById"]);

// PRODUCT
Route::post('/product', [ProductController::class, "store"]);

// USER AUTHORISATION
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});



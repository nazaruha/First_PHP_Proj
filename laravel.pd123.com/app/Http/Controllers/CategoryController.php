<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Get All Categories
    public function index() {
        $list = Category::all();
        return response()->json($list, 200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
            // Кодіровка гарненька. Не обов'зяково
    }
    // Create New Category
    public function store(Request $request) {
        $category = Category::create($request->all());
        $list = Category::all();
        return response()->json($list, 201,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE); // Кодіровка гарненька. Не обов'зяково
    }
    // Update Category
    public function put(Request $request, $id) {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category, 200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }
    // Delete Category by id
    public function delete(Request $request, $id) {
        $category = Category::findOrFail($id);
        $category->delete();
        return 204;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;

class ProductController extends Controller
{
    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"category_id", "name", "price", image},
     *                 @OA\Property(
     *                     property="image",
     *                     type="file"
     *                 ),
     *                 @OA\Property(
     *                     property="category_id",
     *                     type="int64"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property (
     *                     property="price",
     *                     type="decimal"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Product.")
     * )
     */
    public function store(Request $request) {
        $input = $request->all();
        $message = array (
            'category_id.required'=>'Вкажіть категорію',
            'name.required'=>'Вкажіть назву продукту',
            'price.required'=>'Вкажіть ціну продукта'
        );
        $validation = Validator::make($input, [
            'category_id'=>'required',
            'name'=>'required',
            'price'=>'required'
        ], $message);
        if($validation->fails()) { // Якщо модель не валідна
            return response()->json($validation->errors(), 400,
                ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        }
        $product = Product::create($input);
        return response()->json($product, 201,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product/edit/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор продукту",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"name"},
     *                 @OA\Property(
     *                     property="image",
     *                     type="file"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Edit Category.")
     * )
     */
    public function put($id, Request $request) {
        $category = Category::findOrFail($id);
        if ($category == null) {
            return response()->json("Category Id not found", 404,
                ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        }

        $input = $request->all();
        $deleteImage = $category->image;
        $message = array (
            'name.required'=>'Вкажіть назву категорії',
            'image.required'=>'Вкажіть фото категорії',
            'description.required'=>'Вкажіть опис категорії'
        );
        $validation = Validator::make($input, [
            'name'=>'required',
            'image'=>'required',
            'description'=>'required'
        ], $message);
        if($validation->fails()) { // Якщо модель не валідна
            return response()->json($validation->errors(), 400,
                ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        }

        $this->DeleteImage($deleteImage);
        if ($request->hasFile('image')) {
            $storeImage = $request->file('image');
            $fileName = $this->StoreImage($storeImage);
            $input['image'] = $fileName;
        } else {
            $input['image'] = $category->image;
        }

        $category->update($input);
        return response()->json($category, 200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Stringable;
use Intervention\Image\Facades\Image;
use Validator;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\Response(response="200", description="List Categories.")
     * )
     */
    public function index() {
        $list = \App\Models\Category::all();
        foreach($list as $category) {
            return response()->json($category->products, 200,
                ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
            // Кодіровка гарненька. Не обов'зяково
        }
        return response()->json($list, 200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
            // Кодіровка гарненька. Не обов'зяково
    }
    /**
     * @OA\Post(
     *     tags={"Category"},
     *     path="/api/category",
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
     *     @OA\Response(response="200", description="Add Category.")
     * )
     */
    public function store(Request $request) {
        $input = $request->all();
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
        if($validation->fails()) { # Якщо модель не валідна
            return response()->json($validation->errors(), 400,
                ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        }

        if ($request->hasFile("image")) { // перевіряєм чи є в запросі є файл
            $image = $request->file('image');
            $fileName = $this->StoreImage($image);
            $input["image"] = $fileName;
        }
        $category = Category::create($input);
        return response()->json($category, 201,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE); // Кодіровка гарненька. Не обов'зяково
    }
    /**
     * @OA\Post(
     *     tags={"Category"},
     *     path="/api/category/edit/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор категорії",
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

    /**
     * @OA\Delete(
     *     tags={"Category"},
     *     path="/api/category/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор категорії",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Успішне видалення категорії"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Категорії не знайдено"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Не авторизований"
     *     )
     * )
     */
    public function delete(Request $request, $id) {
        $category = Category::findOrFail($id);
        $image = $category->image;
        $this->DeleteImage($image); // need $this. Otherwise function will be undefined
        $category->delete();
        return 204;
    }

    private function StoreImage($image): string {
        $sizes = [50, 150, 300, 600, 1200];
        $fileName = uniqid().'.'.$image->getClientOriginalExtension();
        foreach($sizes as $size) {
            $fileSave = $size.'_'.$fileName;
            $resizeImage = Image::make($image)->resize($size, null, function($cont) { // width, height, callback function
                $cont->aspectRatio(); // зберегти співвідношення сторін, щоб фото не обрізало і не сплющувало
            })->encode();
            $path = public_path('uploads/'.$fileSave);
            file_put_contents($path, $resizeImage);
        }
        return $fileName;
    }
    private function DeleteImage($image): void
    {
        $sizes = [50, 150, 300, 600, 1200];
        foreach ($sizes as $size) {
            $fileDelete = $size.'_'.$image;
            $path = public_path('uploads/'.$fileDelete);
            unlink($path);
        }
    }

    /**
     * @OA\Get(
     *     tags={"Category"},
     *     path="/api/category/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор категорії",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *   security={{ "bearerAuth": {} }},
     *     @OA\Response(response="200", description="List Categories."),
     * @OA\Response(
     *    response=404,
     *    description="Wrong id",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, wrong Category Id has been sent. Pls try another one.")
     *        )
     *     )
     * )
     */
    public function getById($id) {
        $category = Category::findOrFail($id);
        return response()->json($category, 200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }


}

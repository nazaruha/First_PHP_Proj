<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
      'category_id',
      'name',
      'price',
      'description',
    ];

    public function category() // підтягуємо об'єкт категорії, який ми унаслідуємо
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the list of product images for the product
     */
    public function product_images()
    {
        return $this->hasMany(ProductImage::class);
    }
}

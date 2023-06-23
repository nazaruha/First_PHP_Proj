<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'image',
        'description'
    ]; // поля моделі

    /**
     * Get the products for the category
     */
    public function products() // отримувати список продуктів, які належать до даної категорії
    {
        return $this->hasMany(Product::class);
    }
}

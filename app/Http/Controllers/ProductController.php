<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $products = $user->products;

        return response()->json($products);
    }
    //insert 
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'size' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = Auth::user();
        $product = $user->products()->create($request->all());

        return response()->json($product);
    }
    //update
    public function update(Request $request, $productId){
        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'size' => 'required',
        ]);
        $product->update($validatedData);
        return response()->json($product);
    }

    //delete
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}

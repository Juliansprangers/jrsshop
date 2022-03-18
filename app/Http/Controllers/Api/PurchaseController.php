<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PurchaseController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'customer.*' => 'required',
            'products' => 'required',
            'totalPrice' => 'required',
        ]);

        $customer = User::query()->firstOrCreate(
            [
                'email' => $request->input('customer.email')
            ],
            [
                'password' => Hash::make(Str::random(10)),
                'first_name' => $request->input('customer.first_name'),
                'last_name' => $request->input('customer.last_name'),
                'address' => $request->input('customer.address'),
                'zipcode' => $request->input('customer.zipcode'),
                'city' => $request->input('customer.city'),
                'country' => $request->input('customer.country'),
            ]
        );

        $order = $customer->orders()->create(
            [
                'user_id' => $customer->id,
                'transaction_id' => Str::random(10),
                'total_price' => str_replace(',', '.', $request->input('totalPrice')),
            ],
        );



        if(!empty($request->input('products'))){
            foreach ($request->input('products') as $product){
                $order->products()->attach($product['id'],
                    [
                        'quantity' => $product['quantity'],
                        'total_price' => $product['price'] * $product['quantity'],
                        'product_name' =>  $product['name'],
                    ]);
            }
        }

        $order->load('products');
        return $order;
    }
}

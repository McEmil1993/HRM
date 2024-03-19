<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function getAuth()
    {
        return response()->json(['auth' => Auth::user()], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function login(Request $request)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        // Attempt to find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'email not exist!'], 401);
        }

        // Check if the provided password matches the user's hashed password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Wrong password'], 401);
        }

        // If authentication succeeds, generate token and return it
        $token = Str::random(60);

        // Update user's token in the database
        $user->update(['api_token' => $token]);

        return response()->json(['token' => $token, 'user' => $user]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Successfully logged out']);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

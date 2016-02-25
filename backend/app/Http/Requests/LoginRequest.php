<?php

  namespace Flox\Http\Requests;

  class LoginRequest extends Request {

    public function authorize()
    {
      return true;
    }

    /**
     * Login rules.
     */
    public function rules()
    {
      return [
        'username' => 'required',
        'password' => 'required',
      ];
    }

    /**
     * Login error.
     */
    public function response(array $errors)
    {
      return response('Login error', 422);
    }
  }
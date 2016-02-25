<?php

  namespace Flox\Http\Controllers;

  use Flox\Http\Requests\LoginRequest;
  use Illuminate\Contracts\Auth\Guard;

  class AuthController extends Controller {

    private $auth;

    public function __construct(Guard $auth)
    {
      $this->auth = $auth;
    }

    public function login(LoginRequest $request)
    {
      $username = $request->input('username');
      $password = $request->input('password');

      if($this->auth->attempt(['username' => $username, 'password' => $password], true)) {
        return response('Success', 200);
      }

      return response('Unauthorized', 401);
    }

    public function logout()
    {
      $this->auth->logout();
    }

    public function checkLogin()
    {
      return [
        'logged' => $this->auth->check()
      ];
    }
  }

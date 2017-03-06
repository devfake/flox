<?php

  namespace App\Http\Controllers;

  use Illuminate\Contracts\Auth\Guard;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Input;

  class UserController {

    private $auth;

    public function __construct(Guard $auth)
    {
      $this->auth = $auth;
    }

    /**
     * Login user and return correct response.
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function login()
    {
      $username = Input::get('username');
      $password = Input::get('password');

      if($this->auth->attempt(['username' => $username, 'password' => $password], true)) {
        return response('Success', 200);
      }

      return response('Unauthorized', 401);
    }

    /**
     * @return array
     */
    public function getUserData()
    {
      return [
        'username' => Auth::user()->username,
      ];
    }

    /**
     * Save new user credentials.
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function changeUserData()
    {
      $username = Input::get('username');
      $password = Input::get('password');

      $user = Auth::user();
      $user->username = $username;

      if($password != '') {
        $user->password = bcrypt($password);
      }

      if($user->save()) {
        return response('Success', 200);
      }

      return response('Server Error', 500);
    }

    /**
     * Logout user and redirect to home.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
      $this->auth->logout();

      return redirect('/');
    }
  }

<?php

  namespace App\Http\Controllers;

  use Illuminate\Contracts\Auth\Guard;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Request;
  use Symfony\Component\HttpFoundation\Response;

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
      $username = Request::input('username');
      $password = Request::input('password');

      if($this->auth->attempt(['username' => $username, 'password' => $password], true)) {
        return response('Success', Response::HTTP_OK);
      }

      return response('Unauthorized', Response::HTTP_UNAUTHORIZED);
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
      if (isDemo()) {
        return response('Success', Response::HTTP_OK);
      }

      $username = Request::input('username');
      $password = Request::input('password');

      $user = Auth::user();
      $user->username = $username;

      if($password != '') {
        $user->password = bcrypt($password);
      }

      if($user->save()) {
        return response('Success', Response::HTTP_OK);
      }

      return response('Server Error', Response::HTTP_INTERNAL_SERVER_ERROR);
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

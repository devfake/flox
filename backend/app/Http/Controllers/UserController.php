<?php

  namespace App\Http\Controllers;

  use App\Setting;
  use Illuminate\Contracts\Auth\Guard;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Input;

  class UserController {

    private $auth;

    /**
     * Create an instance for 'auth'.
     *
     * @param Guard $auth
     */
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
     * Return user settings for frontend.
     *
     * @return array
     */
    public function settings()
    {
      $settings = Setting::first();

      // Set default value if settings table is empty.
      $genre = $settings ? $settings->show_genre : 0;
      $date = $settings ? $settings->show_date : 1;

      return [
        'username' => Auth::user()->username,
        'genre' => $genre,
        'date' => $date
      ];
    }

    /**
     * Save new user settings.
     */
    public function changeSettings()
    {
      $settings = Setting::first();

      if( ! $settings) {
        $settings = new Setting();
      }

      $settings->show_date = Input::get('date');
      $settings->show_genre = Input::get('genre');

      $settings->save();
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
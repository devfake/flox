<?php

  namespace Tests\Setting;

  use App\User;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Tests\TestCase;
  use Illuminate\Support\Facades\Hash;

  class UserTest extends TestCase {

    use RefreshDatabase;

    protected $user;

    public function setUp(): void
    {
      parent::setUp();

      $this->user = factory(User::class)->create();
    }

    /** @test */
    public function change_user_data_only_if_user_is_logged_in()
    {
      $this->patchJson('api/userdata', [
        'username' => 'Ganta',
        'password' => 'Igarashi',
      ])->assertStatus(401);
    }

    /** @test */
    public function save_new_username()
    {
      $this->assertNotEquals('Ganta', $this->user->username);

      $this->actingAs($this->user)->patchJson('api/userdata', [
        'username' => 'Ganta',
        'password' => 'Igarashi',
      ]);

      $this->assertEquals('Ganta', $this->user->username);
    }

    /** @test */
    public function save_new_password()
    {
      $this->actingAs($this->user)->patchJson('api/userdata', [
        'username' => 'Ganta',
        'password' => 'Igarashi'
      ]);

      $this->assertTrue(Hash::check('Igarashi', $this->user->password));
    }

    /** @test */
    public function change_password_only_if_new_password_is_given()
    {
      $oldPassword = $this->user->password;

      $this->actingAs($this->user)->patchJson('api/userdata', [
        'username' => 'Ganta',
        'password' => ''
      ]);

      $this->assertEquals($oldPassword, $this->user->password);
    }

    /** @test */
    public function user_can_login_with_correct_credentials()
    {
      $this->postJson('api/login', [
        'username' => $this->user->username,
        'password' => 'secret',
      ])->assertSuccessful();
    }

    /** @test */
    public function user_can_not_login_with_wrong_credentials()
    {
      $this->postJson('api/login', [
        'username' => $this->user->username,
        'password' => 'wrong_password',
      ])->assertStatus(401);
    }
  }

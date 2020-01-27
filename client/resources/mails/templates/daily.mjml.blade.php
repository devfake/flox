<mjml>
  <mj-head>
    <mj-style>
      .link {
        color: #895bff;
      }

      .link-title {
        color: #484848;
        text-decoration: none;
        float: left;
        clear: both;
        margin: 0 0 20px 0;
      }

      .link-title:last-child {
        margin: 0;
      }

      .link-title:hover {
        color: #f1309a;
      }

      .link-title span {
        color: gray;
      }

      .headline {
        font-size: 14px;
        float: left;
        text-transform: uppercase;
        color: #f1309a;
        font-weight: bold;
        margin: 0 0 20px 0;
      }
    </mj-style>
    <mj-title>Flox</mj-title>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif"></mj-all>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#ebecee">
    <mj-section>
      <mj-column width="100%">
        <mj-image href="{{ url('/') }}" width="108px" height="32px" src="{{ url('/assets/img/logo-login.png') }}" />
      </mj-column>
      <mj-column width="100%">
        <mj-text align="center">
          <h2>{{ $headline }}</h2>
          <span>{{ $date }}</span>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fff">
      <mj-column>
        <mj-raw>@if(count($episodes))</mj-raw>
        <mj-text font-size="14px" line-height="20px">
          <span class="headline">{{ $episodesHeadline }}</span>
          <br>
          @foreach($episodes as $episode)
            <a href="{{ url("/tv/{$episode->tmdb_id}") }}" class="link-title" target="_blank">
              {{ $episode->item->title }}
              <br>
              <span>S{{ $episode->season_number }}E{{ $episode->episode_number }}</span>
            </a>
          @endforeach
        </mj-text>
        <mj-raw>
          @endif
          @if(count($movies))
        </mj-raw>
        <mj-text>
          <span class="headline">{{ $moviesHeadline }}</span>
          <br>
          @foreach($movies as $movie)
            <a href="{{ url("/movies/{$movie->tmdb_id}") }}" class="link-title" target="_blank">
              {{ $movie->title }}
            </a>
          @endforeach
        </mj-text>
        <mj-raw>@endif</mj-raw>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text color="gray">
          No longer want to receive these emails? Change your <a class="link" target="_blank" href="{{ url('/settings') }}">settings</a> in flox.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>

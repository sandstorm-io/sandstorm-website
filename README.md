This is the content of the [Sandstorm.io](https://sandstorm.io) web site.
sandstorm.io is most user-friendly open source
platform for self-hosting web-application.

When checking out this repository, make sure to use `--recursive` to get submodules!

    git clone --recursive git@github.com:sandstorm-io/sandstorm-website.git

If you forgot to do that, you can recover with this command.

    git submodule init
    git submodule update

To edit with live-reload:

1. Install Rubygems and bundler.
2. Install a JavaScript runtime;
   on Debian, package `nodejs` is sufficient.
3. Install gems: `bundle install --path vendor/bundle`
4. Run `bundle exec guard`
5. Open [http://localhost:4000](http://localhost:4000).

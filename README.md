This is the content of the [Sandstorm.io](https://sandstorm.io) web site.

When checking out this repository, make sure to use `--recursive` to get submodules!

    git clone --recursive git@github.com:sandstorm-io/sandstorm-website.git

If you forgot to do that, you can recover with this command.

    git submodule init
    git submodule update

To edit with live-reload:

1. Install Rubygems and bundler.
2. Install gems: `bundle install --path vendor/bundle`
3. Run `bundle exec guard`
4. Open [http://localhost:4000](http://localhost:4000).

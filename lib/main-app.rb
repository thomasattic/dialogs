APP_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))

require 'rubygems'
require 'sinatra'

class AppMain < Sinatra::Application
  get '/' do
    redirect '/index.html'
  end
end

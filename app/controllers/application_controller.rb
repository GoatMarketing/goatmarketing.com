class ApplicationController < Sinatra::Base
  enable :sessions
  set :session_secret, "password_security"
  register Sinatra::MultiRoute

  # Error Handling
  set :show_exceptions, false

  # set folder for templates to ../views, but make the path absolute
  set :views, File.expand_path('../../views', __FILE__)

  # Set public directory
  set :public_folder, File.expand_path('../../../public', __FILE__)

  get '/' do
    erb :index, {locals: {message: @message}}
  end
end

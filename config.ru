require 'sinatra'
require 'rubygems'
require 'bundler'
require 'sinatra/activerecord'
require './config/environments' #database configuration
require 'erb'
require 'pony'
require 'httparty'
require 'pp'
require 'json'
require 'dotenv'
require "sinatra/cookies"
require 'i18n'
require 'i18n/backend/fallbacks'
require 'sinatra_auth_github'
require 'pry' unless ENV['RACK_ENV'] == 'production'

Bundler.require
Dotenv.load

# Require Controllers, Modules, Helpers
Dir.glob('./app/{controllers}/*.rb').each { |file| require file }
Dir.glob('./app/{modules}/*.rb').each { |file| require file }
Dir.glob('./app/{helpers}/*.rb').each { |file| require file }
Dir.glob('./app/{models}/*.rb').each { |file| require file }

# Enable logging for prod, dev, not test
configure :production, :development do
  enable :logging
end

# Map Routes to Controllers or Modules
map('/') { run ApplicationController }

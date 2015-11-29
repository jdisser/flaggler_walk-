class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:username]).
      try(:authenticate, params[:password])

      if @user
        session[:user_id] = @user.id

        # redirect_to 'itineraries#user_index'

        redirect_to root_path
        #this will change later it will indicate the
        #starting point for villagers after login
      else
        # render action: 'new'
        @user = User.new 
        render :new
      end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end

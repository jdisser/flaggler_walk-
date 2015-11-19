class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(username: params[:username]).
      try(:authenticate, params[:password])

      if @user
        session[:user_id] = @user.id
        redirect_to photos_path
        #this will change later it will indicate the
        #starting point for villagers after login  
      else
        render action: 'new'
      end
   end
end

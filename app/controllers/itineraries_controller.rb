class ItinerariesController < ApplicationController
  before_action :set_itinerary, only: [:show, :edit, :update, :destroy]


  def index
    @itineraries = Itinerary.all
  end

  def user_index
    require_logged_in
    @itineraries = Itinerary.all
  end

  def show
    @itinerary = Itinerary.find(params[:id])
    # set show action to respond to AJAX request
    respond_to do |format|
      format.html
      format.js
    end
  end

  def new
    require_logged_in
    @itinerary = current_user.itineraries.new
  end

  def edit
    require_logged_in
  end

  def edit_trail
    require_logged_in
  end

  def create
    # puts "i see this"
    @itinerary = current_user.itineraries.new(itinerary_params)

    respond_to do |format|
      if @itinerary.save
        format.html { redirect_to edit_itinerary_path(@itinerary), notice: 'Itinerary was successfully created.' }
        format.json { render :show, status: :created, location: @itinerary }
      else
        format.html { render :new }
        format.json { render json: @itinerary.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    require_logged_in
    respond_to do |format|
      if @itinerary.photos.count < 2
       redirect_to edit_itinerary_path(@itinerary), notice: 'Must have a minimum 2 photos!'
      else
        if @itinerary.update(itinerary_params)
          format.html { redirect_to @itinerary, notice: 'Itinerary was successfully updated.' }
          format.json { render :show, status: :ok, location: @itinerary }
        else
          format.html { render :edit }
          format.json { render json: @itinerary.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  def destroy
    require_logged_in
    @itinerary.destroy
    respond_to do |format|
      format.html { redirect_to itineraries_url, notice: 'Itinerary was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_itinerary
      if current_user.present?
        @itinerary = current_user.itineraries.find(params[:id])
      else
        @itinerary = Itinerary.find(params[:id])
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def itinerary_params
      params.require(:itinerary).permit(:title, :description, :phone, :address, :city, :state, :zip, :twitter, :facebook, :instagram, :travel, :user_id)
    end
end

class ItinerariesController < ApplicationController
  before_action :set_itinerary, only: [:show, :edit, :update, :destroy]


  def index
    @itineraries = Itinerary.all
  end

  def user_index
    @itineraries = Itineraries.all
  end

  def show
    @itinerary.photos.all
    # set show action to respond to AJAX request
    respond_to do |format|
      format.html
      format.js
    end
  end

  def new
    @itinerary = Itinerary.new
  end

  def edit

  end

  def create
    puts "i see this"
    @itinerary = Itinerary.new(itinerary_params)

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
    respond_to do |format|
      if @itinerary.update(itinerary_params)
        format.html { redirect_to @itinerary, notice: 'Itinerary was successfully updated.' }
        format.json { render :show, status: :ok, location: @itinerary }
      else
        format.html { render :edit }
        format.json { render json: @itinerary.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @itinerary.destroy
    respond_to do |format|
      format.html { redirect_to itineraries_url, notice: 'Itinerary was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_itinerary
      @itinerary = Itinerary.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def itinerary_params
      params.require(:itinerary).permit(:title, :description, :phone, :address, :city, :state, :zip, :twitter, :facebook, :instagram, :user_id)
    end
end

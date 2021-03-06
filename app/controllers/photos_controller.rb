class PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :edit, :update, :destroy]
  # before_action :require_logged_in
  #adjust for public pages

  # def index
  #   @photos = Photo.all
  # end
  #
  # def user_index
  #   @photos = current_user.photos.all
  # end

  def show

  end

  def index
    @itinerary = Itinerary.find(params[:itinerary_id])
    @photos = @itinerary.photos.all
  end

  # GET /photos/new
  # def new
  #   @itinerary = Itinerary.find(params[:itinerary_id])
  #   @photo = @itinerary.photos.new
  # end

  # GET /photos/1/edit
  # def edit
  # end

  # POST /photos
  # POST /photos.json
  def create
    @itinerary = Itinerary.find(params[:itinerary_id])
    @photo = @itinerary.photos.create(photo_params)

    redirect_to edit_itinerary_path(@itinerary)
  end

  # PATCH/PUT /photos/1
  # PATCH/PUT /photos/1.json
  # def update
  #   respond_to do |format|
  #     if @photo.update(photo_params)
  #       format.html { redirect_to @photo, notice: 'Photo was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @photo }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @photo.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    @photo.destroy
    respond_to do |format|
      format.html { redirect_to photos_url, notice: 'Photo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def photo_params
      params.require(:photo).permit(:title, :latitude, :longitude, :itinerary_id, :picture, :poi_id, :user_id)
    end
    # future use extract data for premium users
    def set_gps_data
      @data = Exif::Data.new("#{Rails.root}/tmp/uploads/")
      @photo.longitude = -@data.gps_longitude
      @photo.latitude = @data.gps_latitude
      @photo.save
    end
end

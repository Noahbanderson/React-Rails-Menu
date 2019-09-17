class Api::ItemsController < ApplicationController
  before_action :set_items, only: [:show, :update, :destroy]
  before_action :set_menu

  def index
    render json: @menu.items
  end

  def show
    render json: @item
  end

  def create
    item = @menu.items.new(item_params)
    if item.save
      render json: item
    else
      render json: {errors: menu.error}, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: {errors: menu.error}, status: :unprocessable_entity
    end
  end

  def destroy
    @item.destroy
    render json: {message: "Menu Deleted #{@menu}"}
  end

  private
    
    def set_items
      @item = Item.find(params[:id])
    end

    def set_menu
      @menu = Menu.find(params[:menu_id])
    end

    def item_params
      params.require(:item).permit(:title, :description, :price)
    end
   
end

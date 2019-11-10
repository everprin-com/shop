require 'rails_helper'

RSpec.describe Item, type: :model do
  describe "categories products more 24" do
    MIN_COUNT_CATEGORIES = 24
    categories = Item.all.map(&:category).uniq
    categories.each do |category|
      it "item category #{category} more then #{MIN_COUNT_CATEGORIES}" do
        item_categories = Item.where(category: category)
        expect(item_categories.count).to be >= MIN_COUNT_CATEGORIES
      end
    end
  end

  describe "description size less 10 symbols" do
    MIN_COUNT_SIZES = 10
    items = Item.all.where.not(size_world: "")
    items.find_each do |item|
      it "item #{item.slug_id} size less #{MIN_COUNT_SIZES} symbols" do
        #byebug
        expect(item.size_world&.length).to be_between(MIN_COUNT_SIZES, 1000)
      end
    end
  end

  describe "picture include http" do
    items = Item.all
    items.find_each do |item|
      it "item #{item.slug_id} include http" do
        item.picture.each do |picture|
         expect(picture).to include("http")
       end
      end
    end
  end

end

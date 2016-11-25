require 'rails_helper'

RSpec.feature "Messagestoadministrator", :type => :feature do
  

  it "does not render a different template" do
    visit "/messagestoadministrators/1"
    expect(page).to have_content "show"
  end

  it "cant go admin panel" do
  	visit admin_admins_path
    expect(page).to_not have_text "Admin pannel"
  end
  
  scenario "User creates a new message" do
    visit new_messagestoadministrator_path

    #fill_in "messagestoadministrator[name]", :with => "in@mail.ru"
    #fill_in "messagestoadministrator[title]", :with => "title"
    fill_in "messagestoadministrator[message]", :with => "new message"

    click_button "Create Messagestoadministrator"

    expect(page).to have_text("Messagestoadministrator was successfully created.")
  end

end
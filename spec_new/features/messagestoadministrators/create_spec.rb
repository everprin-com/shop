require 'rails_helper'

RSpec.feature "Messagestoadministrator", :type => :feature do
  let(:messagestoadministrator) { FactoryGirl.create(:messagestoadministrator) }
  scenario "Create a new contact" do
    visit "/messagestoadministrators/new"
    
    #fill_in "messagestoadministrator[message]", :with => "My Name"
    #fill_in "email", :with => "my@email.com"
    fill_in "name", :with => messagestoadministrator.message

    click_button "Send Message"

    expect(page).to have_title("Everprin - main page")
  end
end
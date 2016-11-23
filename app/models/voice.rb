class Voice < ActiveRecord::Base
  
  belongs_to :film
  
  def self.change_voice(vote_flag, param1,increase_id,current_user,role)
    if Voice.where(voter_id: current_user).where(votable_type: param1).where(votable_id: increase_id).where(vote_flag: vote_flag).present?
      return
    elsif 
      if Voice.where(voter_id: current_user).where(votable_type: param1).where(votable_id: increase_id).present?
        b=Voice.where(voter_id: current_user).where(votable_type: param1).find_by_votable_id(increase_id)
        b.update_attribute(:vote_flag, vote_flag)
        b.save
      end  
    elsif 
      Voice.where(votable_type: param1).where(votable_id: increase_id).find_by_vote_flag(vote_flag).present?
       c=Voice.where(votable_type: param1).where(votable_id: increase_id).where(vote_flag: vote_flag)
       c.update_attribute(:sum_voices, a.sum_voices+1)
        c.save
        
    elsif 
      d=Voice.create(vote_flag: vote_flag, votable_type: param1,votable_id: increase_id, voter_id: current_user, voter_type: role)
      d.save
    end
  end
end

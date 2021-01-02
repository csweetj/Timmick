class TagsController < ApplicationController
  
  def index
    @tags = Post.tags_on(:tags).order('name DESC')
  end

end

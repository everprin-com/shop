class Interpreter
  attr_reader :object
  attr_reader :view_context
  attr_reader :presenter

  def initialize(my_object, presenter = nil, view_context = nil)
    @object = my_object
    @view_context = view_context
    @presenter = presenter
  end

  def render(txt_template, do_markdown = true)
    return '' unless txt_template.is_a?(String)

    txt_template = view_context.sanitize(txt_template) if view_context

    _interpreter = object.respond_to?(:interpreter) ? object.interpreter : 'none'

    txt_template = if presenter
                     txt_template.gsub(/BODY/) do
                       presenter.body(false)
                     end.gsub(/TITLE/) do
                       presenter.title(false)
                     end.gsub(/BUTTONS/) do
                       presenter.buttons(false)
                     end.gsub(/COMPONENTS/) do
                       presenter.components(false)
                     end
                   else
                     txt_template.gsub(/BODY/) do
                       object.try(:body)
                     end.gsub(/TITLE/) do
                       if object.try(:title)
                         object.title
                       else
                         'OBJECT HAS NO TITLE'
                       end
                     end
    end

    _rc = txt_template.gsub(/\[PLACE:(.*?|!\])\]/) do |place|
      render_place_link(place.gsub('PLACE', '').delete('[').delete(']').delete(':'))
    end
                      .gsub(/COVERPICTURE/) do
            render_picture(object.cover_picture.url(:medium), 'img-with-shadow')
          end.gsub(/ATTACHMENT:([0-9]+)/) do |attachment|
            render_attachment(attachment.gsub(/ATTACHMENT:/, '').to_i)
          end.gsub(/COMPONENT:([0-9]+)/) do |component|
            component_i = component.gsub(/\D/, '').to_i
            render_object_component(component_i)
          end.gsub(/YOUTUBE(_PLAYLIST)?:([a-z|A-Z|0-9|\-|_])+/) do |tag|
      args = tag.split(':')
      case args[0]
      when 'YOUTUBE'
        embed_youtube_video(args[1])
      when 'YOUTUBE_PLAYLIST'
        embed_youtube_playlist(args[1])
      else
        'ARGUMENT ERROR: ' + args.inspect
      end
    end

    if do_markdown
      _rc = case _interpreter.to_sym
            when :markdown
              ContentItem.markdown(_rc)
            when :textile
              textilize(_rc).html_safe
            when :simple_text
              view_context ? view_context.sanitize(view_context.simple_format(_rc)) : _rc
            else
              _rc
      end
    end

    _rc.gsub(/COMMENTS/) do
      presenter ? presenter.comments(false) : "CAN'T DISPLAY COMMENTS WITHOUT PRESENTER"
    end.gsub(/ATTACHMENTS/) do
      if presenter.nil?
        "CAN'T DISPLAY ATTACHMENTS WITHOUT PRESENTER"
      elsif presenter.respond_to? :attachments
        presenter.attachments(false)
      else
        'OBJECT HAS NO ATTACHMENTS!'
      end
    end.gsub(/PLUSONE/, '<g:plusone size="small"></g:plusone>')
       .gsub(/\[LOCATION:([\d\., \-]+)\]/) do |location|
      render_location_link(location.gsub('LOCATION', '').delete('[').delete(']').delete(':'))
    end.html_safe
  end

  private

  def render_attachment(idx)
    return 'OBJECT HAS NO ATTACHMENTS!' unless object.respond_to?(:attachments)

    idx ||= 1
    idx -= 1
    if view_context
      attachment = object.attachments.all[idx]
      if attachment
        if attachment.file_content_type =~ /image/
          render_picture(view_context.w3c_url(attachment.file.url(:medium)))
        elsif attachment.file_content_type =~ /video/
          view_context.video_tag(view_context.w3c_url(attachment.file.url), controls: true, autoplay: false)
        else
          view_context.link_to(attachment.file_file_name, view_context.w3c_url(attachment.file.url))
        end
      else
        'ATTACHMENT ' + idx.to_s + ' NOT FOUND'
      end
    else
      'INTERPRETER CAN NOT RENDER ATTACHMENTS WITHOUT A VIEW CONTEXT'
    end
  end

  def render_picture(picture, _class = nil)
    if view_context
      if _class
        view_context.image_tag(picture, class: _class)
      else
        view_context.image_tag(picture)
      end
    else
      "couldn't display #{picture} without view-context"
    end
  end

  def render_object_component(idx)
    return 'OBJECT HAS NO COMPONENTS!' unless object.respond_to?(:components)

    idx ||= 1
    idx -= 1
    component = object.components.all[idx]
    if component
      _component_interpreter = Interpreter.new(_component, context_view)
      _component_interpreter.render(component.t(I18n.locale, :body), false)
    else
      "COMPONENT #{idx} NOT FOUND FOR OBJECT"
    end
  end

  def embed_youtube_playlist(youtube_tag)
    youtube_tag = 'PL' + youtube_tag if youtube_tag.length == 16
    "<iframe width='560' height='345' src='http://www.youtube.com/embed/videoseries?list=" +
      youtube_tag +
      "&amp;hl=en_US' frameborder='0' allowfullscreen=''></iframe>"
  end

  def embed_youtube_video(youtube_tag)
    "<iframe width='420' height='345' src='http://www.youtube.com/embed/" +
      youtube_tag +
      "' frameborder='0' allowfullscreen=''></iframe>"
  end

  def render_location_link(location)
    "<a href='#' class='open-location'>" + location + '</a>'
  end

  def render_place_link(place)
    "<a href='#' class='open-place'>" + place + '</a>'
  end
end

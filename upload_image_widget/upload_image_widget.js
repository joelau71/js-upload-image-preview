/*
    jquery required
    <input type="file" name="upload" class="upload" data-uiw-width="728" data-uiw-height="90">

    upload_image_widget.init($class);
    e.g.: upload_image_widget.init($(".upload"));

    upload_image_widget.generate(name, width, height) will return html element
    name: input attribute name
    width: container width
    height: container height
    e.g.: var element = upload_image_widget.generate("upload", 390, 300);

    status:
    "": no image
    static: no change, but have the image
    remove: remove the image
    update: update the image
*/
upload_image_widget = {
    status: "inactive",
    init: function($class){
        var self = this;
        if (this.status == "active") return false;
        this.status = "active";
        this.$body = $("body");
        if ($class) {
            $class.each(function(){
                var $this = $(this);
                var $parent = $this.parent();
                var field = $this.attr("name");
                var path = $this.attr("data-uiw-path");
                var width = $this.attr("data-uiw-width");
                var height = $this.attr("data-uiw-height");
                var del = $this.attr("data-uiw-del");
                var source = {
                    field: field,
                    width: width,
                    height: height,
                    path: path,
                    del: del
                };
                var element = self.generate(source);
                $this.remove();
                $parent.append(element);
            });
        }
        this.$body.delegate(".uiw-image", "change", function(){
            var $this = $(this);
            var $uiw = $this.parent().parent();
            var $label = $uiw.find(".uiw-image-label");
            var $status = $uiw.find(".uiw-status");
            var source = URL.createObjectURL(this.files[0]);
    
            $uiw.addClass("has-data update");
            $uiw.css("background-image", "url(" + source + ")");
            $status.val("upload");
        });

        this.$body.delegate(".uiw-change", "click", function(){
            var $this = $(this);
            var $uiw = $this.parent().parent();
            var $label = $uiw.find(".uiw-image-label");
            $label.find("input").click();
        });

        this.$body.delegate(".uiw-remove", "click", function(){
            var $this = $(this);
            var $uiw = $this.parent();
            var $status = $uiw.find(".uiw-status");
            var $input = $uiw.find(".uiw-image");

            $uiw.removeClass("has-data");
            $uiw.css("background-image", "");
            $status.val("remove");
            $input.val("");
        });
        this.$body.delegate('.uiw-del', 'click', function(){
            var $this = $(this);
            var $wrapper = $this.parent();
            $wrapper.remove();
        });
    },

    generate: function(source){
        var _default = {
            field: 'upload',
            width: 300,
            height: 300,
            path: '',
            del: false
        };
        var html = "";
        var field = source.field || _default.field;
        var width = source.width || _default.width;
        var height = source.height || _default.height;
        var del = source.del || _default.del;
        var path = source.path || _default.path;
        var background = "";
        var has_data = "";
        var status = "";

        if (this.status == "inactive"){
            this.init();
        }

        if (path !== '') {
            background = "background-image:url(" + path +");";
            has_data = " has-data";
            status = "static";
        }

        html += "<div class='upload-image-widget" + has_data + "' style='width:" + width + "px;height:" + height + "px;" + background + "'>";
        html += "<label class='uiw-image-label'>";
        html += "<input type='file' name='" + field + "' class='uiw-image' value=''>";
        html += "<span>";
        html += "UPLOAD";
        html += "</span>";
        html += "</label>";
        if (del) {
            html += "<div class='uiw-del'>";
            html += "</div>";
        } else {
            html += "<div class='uiw-remove'>";
            html += "</div>";
        }
        html += "<div class='uiw-change'>";
        html += "</div>";
        if (path != "") {
            var file = path.split("/").pop();
            html += "<input type='hidden' name='uiw_path_" + field +"' value='"+file+"'>";
        }
        html += "<input type='hidden' name='status_" + field + "' value='" + status + "' class='uiw-status'>";
        html += "</div>";
        return html;
    }
};
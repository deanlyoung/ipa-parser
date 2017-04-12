var WorkflowActionExtensionClass = function() { };

function getSelectionHTML() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

function getDocumentHTML() {
    if (document.documentElement == null)
        return "";
    
    var doctypeNode = document.doctype;
    if (doctypeNode === null)
        return document.documentElement.outerHTML;
    
    var doctypeString = "<!DOCTYPE " + doctypeNode.name + (doctypeNode.publicId ? ' PUBLIC "' + doctypeNode.publicId + '"' : '') + (!doctypeNode.publicId && doctypeNode.systemId ? ' SYSTEM' : '') + (doctypeNode.systemId ? ' "' + doctypeNode.systemId + '"' : '') + '>';
    return (doctypeString + '\n' + document.documentElement.outerHTML);
}

WorkflowActionExtensionClass.prototype = {
    run: function(arguments) {
        // Pass the baseURI of the webpage to the extension.
        arguments.completionFunction({"URL": document.URL, "title": document.title, "document": getDocumentHTML(), "selection": getSelectionHTML(), "selectionText": document.getSelection().toString()});
    }
};

// The JavaScript file must contain a global object named "ExtensionPreprocessingJS".
var ExtensionPreprocessingJS = new WorkflowActionExtensionClass;

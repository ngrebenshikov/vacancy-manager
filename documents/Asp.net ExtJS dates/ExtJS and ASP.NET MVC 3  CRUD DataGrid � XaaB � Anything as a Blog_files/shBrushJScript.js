SyntaxHighlighter.brushes.JScript=function()
{var keywords='break case catch continue '+
'default delete do else false  '+
'for function if in instanceof '+
'new null return super switch '+
'this throw true try typeof var while with';this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:'string'},{regex:/\s*#.*/gm,css:'preprocessor'},{regex:new RegExp(this.getKeywords(keywords),'gm'),css:'keyword'}];this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);};SyntaxHighlighter.brushes.JScript.prototype=new SyntaxHighlighter.Highlighter();SyntaxHighlighter.brushes.JScript.aliases=['js','jscript','javascript'];
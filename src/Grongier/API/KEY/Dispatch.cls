Class Grongier.API.KEY.Dispatch Extends %CSP.REST
{

/// Ignore any writes done directly by the REST method.
Parameter IgnoreWrites = 0;

/// By default convert the input stream to Unicode
Parameter CONVERTINPUTSTREAM = 1;

/// The default response charset is utf-8
Parameter CHARSET = "utf-8";

Parameter HandleCorsRequest = 1;

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
  <!-- import key -->
  <Route Url="/key" Method="post" Call="import" />
  <!-- get key -->
  <Route Url="/key" Method="get" Call="info" />
</Routes>
}

/// import key
ClassMethod import() As %Status
{
  #dim %request As %CSP.Response
  #dim stream As %CSP.BinaryStream

  set tSC = $$$OK
  set dyna = {}

  Try {

    // Get stream
    set stream = %request.GetMimeData("file")
    if '$IsObject(stream) {
      $$$ThrowOnError($$$ERROR(9200,"no file"))
    }
    
    //Test new key
    set tFile = ##class(%FileCharacterStream).%New()
    $$$ThrowOnError(tFile.CopyFrom(stream))
    $$$ThrowOnError(tFile.LinkToFile("/tmp/iris.key"))
    $$$ThrowOnError(tFile.%Save())
    $$$ThrowOnError($SYSTEM.License.IsValidKey("/tmp/iris.key"))
    
    //Save new key
    set tFile = ##class(%FileCharacterStream).%New()
    $$$ThrowOnError(tFile.LinkToFile($SYSTEM.Util.ManagerDirectory()_"iris.key"))
    $$$ThrowOnError(tFile.CopyFrom(stream))
    $$$ThrowOnError(tFile.%Save())
    $$$ThrowOnError($SYSTEM.License.Upgrade())

    //Set response 
    set dyna.message = "Key Updated"
    w dyna.%ToJSON()
  
  } Catch ex {
      #dim tSC as %Status
      set tSC =  ex.AsStatus()
      if $system.Status.GetErrorCodes(tSC) = 6082 {
        set dyna.message = "Restart needed !!!"
        set tSC = $$$OK
      }
      w dyna.%ToJSON()
  }

  Quit tSC
}

ClassMethod info() As %Status
{

    k ^SPOOL

    set tSummary = ..GetShowSummary()
    set tInfoKey = ..InfoKey()
    
    set dyna = {}
    set dyna.summary = tSummary
    set dyna.infoKey = tInfoKey

    set %response.ContentType = "application/json"

    w dyna.%ToJSON()

    Quit $$$OK
}

ClassMethod GetShowSummary() As %String
{

    /// https://community.intersystems.com/post/spool-forgotten-device
    OPEN 2:1 USE 2
    d $SYSTEM.License.ShowSummary()
    CLOSE 2

    set val = ""
    Set key = ""
    For {
      Set key = $ORDER(^SPOOL(1,key))
      Quit:((key="")||(key=2147483647))
        set tVal = ^SPOOL(1,key)
        set val = val_tVal
    }

    Return val
}

ClassMethod InfoKey() As %String
{

    /// https://community.intersystems.com/post/spool-forgotten-device
    OPEN 2:2 USE 2
    d $SYSTEM.License.CKEY()
    CLOSE 2

    set val = ""
    Set key = ""
    For {
      Set key = $ORDER(^SPOOL(2,key))
      Quit:((key="")||(key=2147483647))
        set tVal = ^SPOOL(2,key)
        set val = val_tVal
    }

    Return val
}

}

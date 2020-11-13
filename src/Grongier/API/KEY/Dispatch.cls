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

  Try {

    // Get stream
    set stream = %request.GetMimeData("file")
    if '$IsObject(stream) {
      $$$ThrowOnError($$$ERROR(9200,"no file"))
    }

  } Catch ex {
      Return ex.AsStatus()
  }

  Quit $$$OK
}

ClassMethod info() As %Status
{

    k ^SPOOL

    set tDecode = ..GetDecode()
    set tCustomer = ..CustomerName()
    
    set dyna = {}
    set dyna.decode = tDecode
    set dyna.customer = tCustomer

    set %response.ContentType = "application/json"

    w dyna.%ToJSON()

    Quit $$$OK
}

ClassMethod GetDecode() As %String
{

    /// https://community.intersystems.com/post/spool-forgotten-device
    OPEN 2:1 USE 2
    d $SYSTEM.License.Decode()
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

ClassMethod CustomerName() As %String
{

    /// https://community.intersystems.com/post/spool-forgotten-device
    OPEN 2:2 USE 2
    d $SYSTEM.License.KeyCustomerName()
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

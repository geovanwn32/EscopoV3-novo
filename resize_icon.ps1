Add-Type -AssemblyName System.Drawing
$sPath = "c:\Users\Geovani Silva\Documents\EscopoV3\EscopoV3 (1)~1\build\icon.png"
$img = [System.Drawing.Image]::FromFile($sPath)
$res = new-object System.Drawing.Bitmap(256, 256)
$g = [System.Drawing.Graphics]::FromImage($res)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 256, 256)
$img.Dispose()
$res.Save($sPath, [System.Drawing.Imaging.ImageFormat]::Png)
$res.Dispose()
$g.Dispose()
Write-Host "Resize Done"

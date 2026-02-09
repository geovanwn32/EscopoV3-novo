# Script to convert PNG to ICO with multiple sizes
Add-Type -AssemblyName System.Drawing

$pngPath = Join-Path $PSScriptRoot "build\icon.png"
$icoPath = Join-Path $PSScriptRoot "build\icon.ico"

# Load the PNG image
$image = [System.Drawing.Image]::FromFile($pngPath)

# Create a bitmap from the image
$bitmap = New-Object System.Drawing.Bitmap $image

# Create icon from bitmap
$icon = [System.Drawing.Icon]::FromHandle($bitmap.GetHicon())

# Save the icon
$fileStream = [System.IO.File]::Create($icoPath)
$icon.Save($fileStream)
$fileStream.Close()

# Cleanup
$icon.Dispose()
$bitmap.Dispose()
$image.Dispose()

Write-Host "Icon created successfully at: $icoPath"

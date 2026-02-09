$ErrorActionPreference = "Stop"
try {
    New-Item -ItemType Directory -Force -Path "build" | Out-Null
    Add-Type -AssemblyName System.Drawing
    $inputPath = "C:/Users/Geovani Silva/.gemini/antigravity/brain/5e816235-3398-449d-9fce-fd01d2eb62f3/uploaded_image_1766518459163.jpg"
    $outputPath = "c:\Users\Geovani Silva\Downloads\EscopoV3 (1)~1\build\icon.png"
    
    if (-not (Test-Path $inputPath)) {
        Write-Error "Input file not found: $inputPath"
    }

    $img = [System.Drawing.Image]::FromFile($inputPath)
    $img.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $img.Dispose()
    Write-Host "Success"
}
catch {
    Write-Error $_
}

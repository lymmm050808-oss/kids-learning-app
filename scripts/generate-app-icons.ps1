Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$iconDirectory = Join-Path $PSScriptRoot '..\public\icons'
New-Item -ItemType Directory -Force -Path $iconDirectory | Out-Null

function New-StarPoints([float]$cx, [float]$cy, [float]$outer, [float]$inner) {
  $points = [System.Collections.Generic.List[System.Drawing.PointF]]::new()
  for ($i = 0; $i -lt 10; $i++) {
    $radius = if ($i % 2 -eq 0) { $outer } else { $inner }
    $angle = (-90 + 36 * $i) * [Math]::PI / 180
    $points.Add([System.Drawing.PointF]::new($cx + $radius * [Math]::Cos($angle), $cy + $radius * [Math]::Sin($angle)))
  }
  return $points.ToArray()
}

function New-AppIcon([int]$size, [string]$fileName) {
  $bitmap = [System.Drawing.Bitmap]::new($size, $size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $scale = $size / 512.0
  $graphics.ScaleTransform([float]$scale, [float]$scale)

  $background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(0, 0, 512, 512),
    [System.Drawing.Color]::FromArgb(255, 113, 139, 212),
    [System.Drawing.Color]::FromArgb(255, 52, 77, 145),
    45
  )
  $round = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $round.AddArc(0, 0, 224, 224, 180, 90)
  $round.AddArc(288, 0, 224, 224, 270, 90)
  $round.AddArc(288, 288, 224, 224, 0, 90)
  $round.AddArc(0, 288, 224, 224, 90, 90)
  $round.CloseFigure()
  $graphics.FillPath($background, $round)

  $starBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 255, 244, 194))
  $graphics.FillPolygon($starBrush, (New-StarPoints 106 137 22 9))
  $graphics.FillEllipse($starBrush, 394, 344, 16, 16)
  $graphics.FillEllipse($starBrush, 122, 372, 12, 12)

  $orbit = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $orbit.AddEllipse(72, 191, 368, 156)
  $matrix = [System.Drawing.Drawing2D.Matrix]::new()
  $matrix.RotateAt(-28, [System.Drawing.PointF]::new(256, 269))
  $orbit.Transform($matrix)
  $orbitPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255, 215, 247, 255), 17)
  $orbitPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $graphics.DrawPath($orbitPen, $orbit)

  $planetBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(155, 168, 202, 202),
    [System.Drawing.Color]::FromArgb(255, 176, 241, 242),
    [System.Drawing.Color]::FromArgb(255, 97, 184, 223),
    45
  )
  $graphics.FillEllipse($planetBrush, 155, 168, 202, 202)
  $planetPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255, 243, 252, 255), 11)
  $graphics.DrawEllipse($planetPen, 155, 168, 202, 202)
  $land = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $land.AddBezier(182, 257, 204, 235, 224, 235, 239, 251)
  $land.AddBezier(239, 251, 254, 267, 271, 267, 289, 249)
  $land.AddBezier(289, 249, 306, 232, 326, 229, 346, 243)
  $land.AddBezier(346, 243, 339, 294, 302, 335, 254, 344)
  $land.AddBezier(254, 344, 219, 333, 192, 301, 182, 257)
  $land.CloseFigure()
  $landBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(230, 112, 212, 210))
  $graphics.FillPath($landBrush, $land)

  [System.Drawing.PointF[]]$badge = New-StarPoints 359 160 49 22
  $badgePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255, 255, 247, 216), 8)
  $badgePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $badgeBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 255, 211, 109))
  $graphics.FillPolygon($badgeBrush, $badge)
  $graphics.DrawPolygon($badgePen, $badge)

  $outputPath = Join-Path $iconDirectory $fileName
  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose(); $bitmap.Dispose(); $background.Dispose(); $round.Dispose(); $orbit.Dispose(); $matrix.Dispose(); $orbitPen.Dispose(); $planetBrush.Dispose(); $planetPen.Dispose(); $land.Dispose(); $landBrush.Dispose(); $badgePen.Dispose(); $badgeBrush.Dispose(); $starBrush.Dispose()
}

New-AppIcon 192 'icon-192.png'
New-AppIcon 512 'icon-512.png'
New-AppIcon 180 'apple-touch-icon.png'

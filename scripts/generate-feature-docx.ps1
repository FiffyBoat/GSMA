$ErrorActionPreference = "Stop"

$outputDir = Join-Path $PSScriptRoot "..\generated-docs"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function Escape-Xml {
  param([string]$Text)

  if ($null -eq $Text) {
    return ""
  }

  return [System.Security.SecurityElement]::Escape($Text)
}

function New-ParagraphXml {
  param(
    [string]$Text,
    [string]$Style = "Normal"
  )

  $escaped = Escape-Xml $Text
  return "<w:p><w:pPr><w:pStyle w:val=`"$Style`"/></w:pPr><w:r><w:t xml:space=`"preserve`">$escaped</w:t></w:r></w:p>"
}

function New-BulletParagraphXml {
  param([string]$Text)

  $escaped = Escape-Xml $Text
  return "<w:p><w:pPr><w:pStyle w:val=`"ListParagraph`"/><w:numPr><w:ilvl w:val=`"0`"/><w:numId w:val=`"1`"/></w:numPr></w:pPr><w:r><w:t xml:space=`"preserve`">$escaped</w:t></w:r></w:p>"
}

function New-DocxPackage {
  param(
    [string]$FilePath,
    [string[]]$BodyXml
  )

  $tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())
  $null = New-Item -ItemType Directory -Force -Path $tempRoot
  $null = New-Item -ItemType Directory -Force -Path (Join-Path $tempRoot "_rels")
  $null = New-Item -ItemType Directory -Force -Path (Join-Path $tempRoot "docProps")
  $null = New-Item -ItemType Directory -Force -Path (Join-Path $tempRoot "word")

  $contentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
'@

  $rootRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
'@

  $appXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office Word</Application>
</Properties>
'@

  $timestamp = (Get-Date).ToUniversalTime().ToString("s") + "Z"
  $coreXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Website Features Document</dc:title>
  <dc:creator>OpenAI Codex</dc:creator>
  <cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">$timestamp</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">$timestamp</dcterms:modified>
</cp:coreProperties>
"@

  $stylesXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
      <w:sz w:val="22"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="36"/>
      <w:color w:val="8B0000"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="28"/>
      <w:color w:val="333333"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="24"/>
      <w:color w:val="444444"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph">
    <w:name w:val="List Paragraph"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr>
      <w:ind w:left="720" w:hanging="360"/>
    </w:pPr>
  </w:style>
</w:styles>
'@

  $documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 wp14">
  <w:body>
    $($BodyXml -join "`n    ")
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>
"@

  Set-Content -LiteralPath (Join-Path $tempRoot "[Content_Types].xml") -Value $contentTypes -Encoding UTF8
  Set-Content -LiteralPath (Join-Path $tempRoot "_rels\.rels") -Value $rootRels -Encoding UTF8
  Set-Content -LiteralPath (Join-Path $tempRoot "docProps\app.xml") -Value $appXml -Encoding UTF8
  Set-Content -LiteralPath (Join-Path $tempRoot "docProps\core.xml") -Value $coreXml -Encoding UTF8
  Set-Content -LiteralPath (Join-Path $tempRoot "word\styles.xml") -Value $stylesXml -Encoding UTF8
  Set-Content -LiteralPath (Join-Path $tempRoot "word\document.xml") -Value $documentXml -Encoding UTF8

  $zipPath = [System.IO.Path]::ChangeExtension($FilePath, ".zip")
  if (Test-Path $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
  }
  if (Test-Path $FilePath) {
    Remove-Item -LiteralPath $FilePath -Force
  }

  Compress-Archive -Path (Join-Path $tempRoot "*") -DestinationPath $zipPath -Force
  Move-Item -LiteralPath $zipPath -Destination $FilePath -Force
  Remove-Item -LiteralPath $tempRoot -Recurse -Force
}

$clientSummaryBody = @(
  (New-ParagraphXml -Text "Ga South Municipal Assembly Website Features" -Style "Title"),
  (New-ParagraphXml -Text "Client-Ready Feature Summary" -Style "Heading1"),
  (New-ParagraphXml -Text "This website serves as a modern digital platform for the Ga South Municipal Assembly, combining public information access with a strong content management system for staff updates."),
  (New-ParagraphXml -Text "Key Features" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Professional public-facing website for the Assembly with responsive desktop and mobile access."),
  (New-BulletParagraphXml -Text "Dynamic homepage with hero banners, quick links, latest news, and leadership highlights."),
  (New-BulletParagraphXml -Text "Dedicated service pages covering permits, licenses, rates, and other Assembly services."),
  (New-BulletParagraphXml -Text "Department and unit pages that can be updated from the admin side."),
  (New-BulletParagraphXml -Text "Projects showcase for ongoing and completed municipal development work."),
  (New-BulletParagraphXml -Text "News, events, gallery, and document archive for public communication."),
  (New-BulletParagraphXml -Text "Document download area for official files and public reference materials."),
  (New-BulletParagraphXml -Text "Portal links to useful external government and service platforms."),
  (New-BulletParagraphXml -Text "Contact page with map, contact details, and admin-managed social media links."),
  (New-BulletParagraphXml -Text "Admin dashboard for managing content without editing code."),
  (New-ParagraphXml -Text "Business Value" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Improves public access to Assembly information and services."),
  (New-BulletParagraphXml -Text "Makes updates faster for staff through an admin dashboard."),
  (New-BulletParagraphXml -Text "Supports transparency, communication, and community engagement.")
)

$proposalBody = @(
  (New-ParagraphXml -Text "Ga South Municipal Assembly Website Features" -Style "Title"),
  (New-ParagraphXml -Text "Proposal-Style Feature List" -Style "Heading1"),
  (New-ParagraphXml -Text "The platform combines public information delivery, service visibility, and internal content management in one centralized municipal website."),
  (New-ParagraphXml -Text "Public Website Features" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Responsive design optimized for desktop and mobile users."),
  (New-BulletParagraphXml -Text "Structured website navigation for Home, About, Services, Departments, Projects, Media, Portals, and Contact."),
  (New-BulletParagraphXml -Text "Dynamic service pages for Business Operating Permit, Marriage License, Building Permit, Property Rates, and Signage Permit."),
  (New-BulletParagraphXml -Text "Department detail pages with leadership and organizational information."),
  (New-BulletParagraphXml -Text "Projects listing and detail pages for Assembly development initiatives."),
  (New-BulletParagraphXml -Text "Media section covering news, events, gallery, and official documents."),
  (New-BulletParagraphXml -Text "Document archive with categorized downloadable files."),
  (New-BulletParagraphXml -Text "Gallery experience supporting photo albums and video content."),
  (New-BulletParagraphXml -Text "Search functionality across major public content areas."),
  (New-BulletParagraphXml -Text "Contact page with map embed, official contact details, and social links."),
  (New-ParagraphXml -Text "Content Management Features" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Admin dashboard with role-based access control."),
  (New-BulletParagraphXml -Text "Management modules for hero slides, news, projects, events, gallery, documents, departments, leadership, assembly members, and site settings."),
  (New-BulletParagraphXml -Text "Admin-managed public settings for contact details, profile content, portal links, and social media handles."),
  (New-BulletParagraphXml -Text "Upload support for images, documents, and video media."),
  (New-BulletParagraphXml -Text "Album-style gallery management with per-image add, remove, and replace actions."),
  (New-ParagraphXml -Text "Operational Benefits" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Reduces dependency on developers for routine content updates."),
  (New-BulletParagraphXml -Text "Keeps public information current through centralized administration."),
  (New-BulletParagraphXml -Text "Strengthens transparency, communication, and digital service delivery.")
)

$technicalBody = @(
  (New-ParagraphXml -Text "Ga South Municipal Assembly Website Features" -Style "Title"),
  (New-ParagraphXml -Text "Technical Feature Document" -Style "Heading1"),
  (New-ParagraphXml -Text "This document summarizes the current functional scope of the website based on the implemented codebase."),
  (New-ParagraphXml -Text "Platform Overview" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Built with Next.js using app-router based routes."),
  (New-BulletParagraphXml -Text "Uses Supabase for data storage, media storage, and content delivery."),
  (New-BulletParagraphXml -Text "Supports dynamic server-rendered public pages and authenticated admin management pages."),
  (New-ParagraphXml -Text "Public-Side Functional Modules" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Homepage with hero slider, quick access cards, latest news, welcome content, and leadership highlight."),
  (New-BulletParagraphXml -Text "About section with overview, Assembly page, leadership page, MCE profile, and MCD profile."),
  (New-BulletParagraphXml -Text "Services module with service listing and individual detail pages."),
  (New-BulletParagraphXml -Text "Departments module with dynamic department menu items and detail pages."),
  (New-BulletParagraphXml -Text "Projects module with archive and individual project pages."),
  (New-BulletParagraphXml -Text "Events module with archive, event detail pages, and featured event popup behavior."),
  (New-BulletParagraphXml -Text "News module with post archive and single article pages."),
  (New-BulletParagraphXml -Text "Gallery module with paginated archive and mixed-media lightbox support."),
  (New-BulletParagraphXml -Text "Documents module with categorized archive and direct downloads."),
  (New-BulletParagraphXml -Text "Portals page with admin-driven external links and call-to-action content."),
  (New-BulletParagraphXml -Text "Contact page with public settings, map display, and shared social links."),
  (New-BulletParagraphXml -Text "Search module covering news, projects, events, and gallery content."),
  (New-ParagraphXml -Text "Admin-Side Functional Modules" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Overview dashboard for high-level content monitoring."),
  (New-BulletParagraphXml -Text "Hero slide management."),
  (New-BulletParagraphXml -Text "News management."),
  (New-BulletParagraphXml -Text "Projects management."),
  (New-BulletParagraphXml -Text "Events management."),
  (New-BulletParagraphXml -Text "Gallery management including multi-image albums and optional video."),
  (New-BulletParagraphXml -Text "Documents management."),
  (New-BulletParagraphXml -Text "Departments and units management."),
  (New-BulletParagraphXml -Text "Leadership and assembly members management."),
  (New-BulletParagraphXml -Text "Admin users management."),
  (New-BulletParagraphXml -Text "Site settings management for reusable public content."),
  (New-ParagraphXml -Text "Media and Content Handling" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Image uploads are supported across major content modules."),
  (New-BulletParagraphXml -Text "Video uploads are supported for gallery content."),
  (New-BulletParagraphXml -Text "Gallery items can contain multiple photos and a video within the same album."),
  (New-BulletParagraphXml -Text "Album images can be removed or replaced individually from the admin editor."),
  (New-BulletParagraphXml -Text "Removed gallery images are cleaned up during save operations."),
  (New-ParagraphXml -Text "Configuration and Shared Settings" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Shared public settings drive contact information, leadership profile content, portals content, and social links."),
  (New-BulletParagraphXml -Text "Social links are centralized so admin updates propagate across the public site."),
  (New-BulletParagraphXml -Text "Public pages use database-driven content instead of hardcoded page text wherever configured."),
  (New-ParagraphXml -Text "User Experience Notes" -Style "Heading1"),
  (New-BulletParagraphXml -Text "Responsive navigation supports desktop dropdowns and mobile navigation drawers."),
  (New-BulletParagraphXml -Text "Pagination is used for large archives such as gallery, documents, and events."),
  (New-BulletParagraphXml -Text "Mixed-media gallery viewing prevents video from overriding associated album photos."),
  (New-BulletParagraphXml -Text "Public-facing pages emphasize quick access to municipal information and documents.")
)

New-DocxPackage -FilePath (Join-Path $outputDir "GSMA-Feature-Summary-Client.docx") -BodyXml $clientSummaryBody
New-DocxPackage -FilePath (Join-Path $outputDir "GSMA-Feature-Summary-Proposal.docx") -BodyXml $proposalBody
New-DocxPackage -FilePath (Join-Path $outputDir "GSMA-Feature-Summary-Technical.docx") -BodyXml $technicalBody

Write-Host "Generated documents in $outputDir"

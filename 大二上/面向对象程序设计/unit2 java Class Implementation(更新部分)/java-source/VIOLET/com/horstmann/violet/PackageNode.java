/*
Violet - A program for editing UML diagrams.

Copyright (C) 2002 Cay S. Horstmann (http://horstmann.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

package com.horstmann.violet;

import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.font.FontRenderContext;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.util.List;

/**
   A package node in a UML diagram.
*/
public class PackageNode extends RectangularNode
{
   /**
      Construct a package node with a default size
   */
   public PackageNode()
   {
      name = "";
      contents = new MultiLineString();
      setBounds(new Rectangle2D.Double(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT));
   }

   public void draw(Graphics2D g2)
   {
      Rectangle2D bounds = getBounds();

      Font font = g2.getFont();
      FontRenderContext frc = g2.getFontRenderContext();
      Rectangle2D nameBounds = font.getStringBounds(name, frc);

      Rectangle2D top = new Rectangle2D.Double(
         bounds.getX(), bounds.getY(),
         Math.max(nameBounds.getWidth() + 2 * NAME_GAP, DEFAULT_TOP_WIDTH), 
         Math.max(nameBounds.getHeight(), DEFAULT_TOP_HEIGHT));
      g2.draw(top);

      g2.drawString(name, (float)(bounds.getX() + NAME_GAP), (float)(bounds.getY() - nameBounds.getY() + (top.getHeight() - nameBounds.getHeight()) / 2));


      Rectangle2D bot = new Rectangle2D.Double(bounds.getX(),
         bounds.getY() + top.getHeight(), 
         bounds.getWidth(), bounds.getHeight() - top.getHeight());

      g2.draw(bot);
      contents.draw(g2, bot);
   }

   public void layout(Graph g, Graphics2D g2, Grid grid)
   {
      Rectangle2D bounds = getBounds();

      Font font = g2.getFont();
      FontRenderContext frc = g2.getFontRenderContext();
      Rectangle2D nameBounds = font.getStringBounds(name, frc);

      Rectangle2D top = new Rectangle2D.Double(0, 0,
         Math.max(nameBounds.getWidth(), DEFAULT_TOP_WIDTH), 
         Math.max(nameBounds.getHeight(), DEFAULT_TOP_HEIGHT));

      Rectangle2D bot = contents.getBounds(g2);
      Rectangle2D min = new Rectangle2D.Double(0, 0,
         DEFAULT_WIDTH, DEFAULT_HEIGHT - DEFAULT_TOP_HEIGHT);
      bot.add(min);
      double width = Math.max(top.getWidth() + DEFAULT_WIDTH - DEFAULT_TOP_WIDTH, bot.getWidth());
      double height = top.getHeight() + bot.getHeight();

      List children = getChildren();
      if (children.size() > 0)
      {
         Rectangle2D childBounds = new Rectangle2D.Double(
            bounds.getX(), bounds.getY(), 0, 0);
         for (int i = 0; i < children.size(); i++)
         {
            Node child = (Node)children.get(i);
            child.layout(g, g2, grid);
            childBounds.add(child.getBounds());
         }
         width = Math.max(width, 
            childBounds.getWidth() + XGAP);
         height = Math.max(height, 
            childBounds.getHeight() + YGAP);
      }
      Rectangle2D b = new Rectangle2D.Double(
         bounds.getX(), bounds.getY(), width, height);
      grid.snap(b);
      setBounds(b);
   }

   /**
      Sets the name property value.
      @param newValue the class name
   */
   public void setName(String newValue)
   {
      name = newValue;
   }

   /**
      Gets the name property value.
      @return the class name
   */
   public String getName()
   {
      return name;
   }

   /**
      Sets the contents property value.
      @param newValue the contents of this class
   */
   public void setContents(MultiLineString newValue)
   {
      contents = newValue;
   }

   /**
      Gets the contents property value.
      @return the contents of this class
   */
   public MultiLineString getContents()
   {
      return contents;
   }

   public Object clone()
   {
      PackageNode cloned = (PackageNode)super.clone();
      cloned.contents = (MultiLineString)contents.clone();
      return cloned;
   }

   public boolean addNode(Node n, Point2D p)
   {
      if (n instanceof ClassNode || n instanceof InterfaceNode || n instanceof PackageNode)
      {
         addChild(n);
         return true;
      }
      else
         return n instanceof NoteNode;
   }


   private String name;
   private MultiLineString contents;

   private static int DEFAULT_TOP_WIDTH = 60;
   private static int DEFAULT_TOP_HEIGHT = 20;
   private static int DEFAULT_WIDTH = 100;
   private static int DEFAULT_HEIGHT = 80;
   private static final int NAME_GAP = 3;
   private static final int XGAP = 5;
   private static final int YGAP = 5;
}
